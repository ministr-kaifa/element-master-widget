export type ApplicationConfig = {
  widgetId?: string
  roomId?: string
  theme?: string
  userId?: string
  displayName?: string
  avatarUrl?: string
  clientId?: string
  language?: string
  baseUrl?: string
  token?: string
}

export function getApplicationConfig(): ApplicationConfig {
  const searchParams = new URLSearchParams(window.location.search)
  const matrixRoomId = searchParams.get("matrix_room_id");
  const roomId = searchParams.get("room_id");
  const finalRoomId = (matrixRoomId && matrixRoomId.trim() !== "" ? matrixRoomId
                      : roomId && roomId.trim() !== "" ? roomId
                      : undefined);
  console.log(`finalRoomId: ${finalRoomId}`);
  return {
    theme: searchParams.get("theme") ?? undefined,
    userId: searchParams.get("matrix_user_id") ?? undefined,
    displayName: searchParams.get("matrix_display_name") ?? undefined,
    avatarUrl: searchParams.get("matrix_avatar_url") ?? undefined,
    roomId: finalRoomId,
    clientId: searchParams.get("clientId") ?? undefined,
    language: searchParams.get("matrix_client_language") ?? undefined,
    baseUrl:
      searchParams.get("matrix_base_url") === "$org.matrix.msc4039.matrix_base_url"
        ? searchParams.get("fallback_base_url") ?? undefined
        : searchParams.get("matrix_base_url") ?? undefined,
    token: searchParams.get("token") ?? undefined
  }
}
