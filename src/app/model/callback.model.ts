export interface CallbackModel {
  header: Header;
  body: any;
}

interface Header {
  responseCode: string;
}
