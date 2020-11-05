export interface Environment {
  production: boolean
  uri: string
  uriWs: string
  showConsoleLogs: ShowConsoleLogs
  lexRuntimeSettings: LexRuntimeSettings
  clientCredentialsLoomAI: ClientCredentialsLoomAI
  proxy: string
  protectionKey: string
  qConsultation: QConsultation
  firebase: FirebaseConfig
}

interface ShowConsoleLogs {
  serverRequest: boolean
  serverResponse: boolean
  serverError: boolean
}

interface LexRuntimeSettings {
  accessKeyId: string
  secretAccessKey: string
  region: string
}

interface ClientCredentialsLoomAI {
  CLIENT_ID: string
  CLIENT_SECRET: string
}

interface QConsultation {
  url: string,
  credentials: QConsultationCredentials
}

interface QConsultationCredentials {
  APPLICATION_ID: number
  AUTH_KEY: string
  AUTH_SECRET: string
  config: {
    endpoints: {
      api: string
      chat: string
    }
  }
}

interface FirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
}
