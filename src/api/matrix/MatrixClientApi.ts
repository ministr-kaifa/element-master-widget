export type ApiConfig = {
  token: string;
  baseUrl: string;
};

export default class MatrixClientApi {
  private token: string;
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.token = config.token;
    this.baseUrl = config.baseUrl;
  }

  async matrixRequest(path: string, method: string = 'GET', body?: any) {
    const url = `${this.baseUrl}/_matrix/client/v3${path}`;
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Matrix API error: ${res.status} ${text}`);
    }
    return res.json();
  }

  makeTxnId() {
    return Date.now().toString();
  }

  async createEvent(roomId: string, eventType: string, content: {}, txnId?: string) {
    console.log(`saving event: ${JSON.stringify({roomId, eventType, content, txnId})}`)
    if (!txnId) {
      txnId = this.makeTxnId();
    }
    return this.matrixRequest(`/rooms/${encodeURIComponent(roomId)}/send/${eventType}/${txnId}`, 'PUT', 
      content
    );
  }

  async redactEvent(roomId: string, eventId: string, reason?: string, txnId?: string) {
    if (!txnId) txnId = this.makeTxnId();
    const body: { reason?: string } = {};
    if (reason) body.reason = reason;

    return this.matrixRequest(
      `/rooms/${encodeURIComponent(roomId)}/redact/${encodeURIComponent(eventId)}/${txnId}`,
      'PUT',
      body
    );
  }

  async readEvent(roomId: string, eventId: string) {
    return this.matrixRequest(
      `/rooms/${encodeURIComponent(roomId)}/event/${encodeURIComponent(eventId)}`,
      'GET'
    );
  }

  async readMessages(
    roomId: string,
    eventType: string | null = null,
    fromToken: string | null = null,
    dir: 'b' | 'f' = 'b',
    limit = 100
  ) {
    let filter = eventType
      ? { types: [eventType] }
      : {};

    const filterParam = encodeURIComponent(JSON.stringify(filter));

    let path = `/rooms/${encodeURIComponent(roomId)}/messages?dir=${dir}&limit=${limit}&filter=${filterParam}`;
    if (fromToken) path += `&from=${encodeURIComponent(fromToken)}`;

    return this.matrixRequest(path);
  }

  async sync(since?: string, eventType?: string) {
    const filter: any = eventType ? { room: { timeline: { types: [eventType] } } } : {};
    const filterParam = encodeURIComponent(JSON.stringify(filter));

    let path = `/sync?timeout=30000&filter=${filterParam}`;
    if (since) path += `&since=${encodeURIComponent(since)}`;

    return this.matrixRequest(path);
  }
  
  async uploadImage(blob: Blob, filename = "board.png") {
    const url = `${this.baseUrl}/_matrix/media/r0/upload?filename=${encodeURIComponent(filename)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}` },
      body: blob
    });
    if (!res.ok) throw new Error(`upload failed: ${res.status}`);
    const data = await res.json();
    return data.content_uri; 
  }

  async updateRoomState(
    roomId: string,
    eventType: string,
    content: Record<string, any>,
    stateKey: string = ""
  ) {
    console.log(`updating room state: ${JSON.stringify({ roomId, eventType, stateKey, content })}`);

    return this.matrixRequest(
      `/rooms/${encodeURIComponent(roomId)}/state/${encodeURIComponent(eventType)}/${encodeURIComponent(stateKey)}`,
      "PUT",
      content
    );
  }
  
  async checkToken(): Promise<boolean> {
    try {
      await this.matrixRequest("/account/whoami", "GET");
      return true;
    } catch (err) {
      if (err instanceof Error && err.message.includes("401")) {
        return false;
      }
      throw err;
    }
  }
}
