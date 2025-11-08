import { useEffect, useState } from "react";
import { ActionList } from "./components/ActionList";
import { Header } from "./components/Header";
import { ApplicationConfig, getApplicationConfig } from "./config";
import TokenPrompt from "./TokenPrompt";
import { getToken, setToken } from "./utils/tokenStorage";

function App() {
  const [config, setConfig] = useState<ApplicationConfig>(getApplicationConfig())
  
  useEffect(() => {
      import("eruda").then(eruda => eruda.default.init({}))
  }, [])

  useEffect(() => {
    const persistedToken = getToken()
    if (persistedToken) {
      const updatedConfig = getApplicationConfig()
      updatedConfig.token = persistedToken
      setConfig(updatedConfig)
    }
  }, [])

  const handleTokenSet = (token: string) => {
    const updatedConfig = getApplicationConfig()
    updatedConfig.token = token ?? undefined
    setConfig(updatedConfig)
    setToken(token)
  }

  const handleLogout = () => {
    const updatedConfig = getApplicationConfig()
    updatedConfig.token = undefined
    setToken(null)
    setConfig(updatedConfig)
  }

  if (!config.token) {
    return <TokenPrompt onTokenSet={handleTokenSet} />
  }
  
  console.log(JSON.stringify(config));

  const actions = Array.from({ length: 20 }).map((_, i) => ({
    id: `item-${i}`,
    title: `Действие ${i + 1}`,
    description: `Описание для действия ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/${i}/400/200`,
    onClick: () => alert(`Вы нажали на действие ${i + 1}`),
  }))

return (
  <div className="flex flex-col h-screen">
    <Header config={config} onLogout={handleLogout} />
    <div className="flex-1 overflow-auto pt-16">
      <ActionList items={actions} />
    </div>
  </div>
);
}

export default App;
