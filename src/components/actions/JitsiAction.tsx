import MatrixClientApi from "@/api/matrix/MatrixClientApi";
import { ApplicationConfig } from "@/config";
import JitsiSVG from "../../assets/jitsi.svg";
import { ActionItemBase } from "../ActionList";

type JitsiActionProps = {
  api: MatrixClientApi;
  config: ApplicationConfig;
};

export function JitsiAction({ api, config }: Readonly<JitsiActionProps>) {

  const jitsiBase = import.meta.env.VITE_JITSI_BASE_URL;
  const jitsiDomain = import.meta.env.VITE_JITSI_DOMAIN;

  const onClick = async () => {
    try {
      const roomName = config.roomId;
      const conferenceId = `Jitsi${Math.random().toString(36).slice(2, 12)}`;
      const content = {
        type: "jitsi",
        url:
          `${jitsiBase}?confId=${conferenceId}` +
          `#conferenceDomain=${jitsiDomain}` +
          `&conferenceId=${conferenceId}` +
          `&isAudioOnly=false` +
          `&startWithAudioMuted=false` +
          `&startWithVideoMuted=true` +
          `&isVideoChannel=false` +
          `&displayName=$matrix_display_name` +
          `&avatarUrl=$matrix_avatar_url` +
          `&userId=$matrix_user_id` +
          `&roomId=$matrix_room_id` +
          `&theme=$theme` +
          `&roomName=${roomName}` +
          `&supportsScreensharing=true` +
          `&language=$org.matrix.msc2873.client_language`,
        name: "Jitsi",
        data: {
          conferenceId,
          roomName,
          isAudioOnly: false,
          isVideoChannel: false,
          domain: jitsiDomain,
        },
      };

      const res = await api.updateRoomState(
        config.roomId!,
        "im.vector.modular.widgets",
        content,
        "jitsi"
      );

      console.log("Jitsi widget created:", res);
    } catch (err) {
      console.error("Ошибка при создании Jitsi виджета:", err);
    }
  }

  return (
      <ActionItemBase 
        onClick={onClick}
        id={"jitsi"}
        title={"Jitsi"} 
        description={"Запустить джитси звонок в этом чате"} 
        imageUrl={JitsiSVG}      
      />
  )
}
