import { useEffect, useRef, useState } from "react";
import MatrixClientApi from "./api/matrix/MatrixClientApi";
import { ActionList } from "./components/ActionList";
import { CircleAction } from "./components/actions/CircleAction";
import { JitsiAction } from "./components/actions/JitsiAction";
import { Header } from "./components/Header";
import { ApplicationConfig, getApplicationConfig } from "./config";
import TokenPrompt from "./TokenPrompt";
import { getToken, setToken } from "./utils/tokenStorage";

function App() {
  const [config, setConfig] = useState<ApplicationConfig>(getApplicationConfig())
  const apiRef = useRef<MatrixClientApi | null>(null);
  
  useEffect(() => {
      import("eruda").then(eruda => eruda.default.init({}))
  }, [])

  useEffect(() => {
    const persistedToken = getToken()
    if (persistedToken) {
      handleTokenSet(persistedToken)
    }
  }, [])

  const handleTokenSet: (token: string) => Promise<string> = async (token: string) => {
    const api = new MatrixClientApi({
      token: token,
      baseUrl: config!.baseUrl!,
    });
    const isTokenValid = await api.checkToken();
    if (isTokenValid) {
      const updatedConfig = getApplicationConfig()
      updatedConfig.token = token ?? undefined
      apiRef.current = api
      setConfig(updatedConfig)
      setToken(token)
      return "";
    } else {
      return "Токен недействителен";
    }
  }

  const handleLogout = () => {
    const updatedConfig = getApplicationConfig()
    updatedConfig.token = undefined
    setToken(null)
    setConfig(updatedConfig)
  }

  if (!config.token) {
    return <TokenPrompt onTokenSet={handleTokenSet}/>
  }
  
  console.log(JSON.stringify(config));

  const allActions = [
    <JitsiAction api={apiRef.current!} config={config}/>,
    <CircleAction/>
  ];

return (
  <div className="flex flex-col h-screen">
    <Header config={config} onLogout={handleLogout} />
    <div className="flex-1 overflow-auto pt-16">
      <ActionList items={allActions} />
    </div>
  </div>
);
}

export default App;
