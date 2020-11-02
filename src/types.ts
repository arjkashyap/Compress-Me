export interface EncoderResponse {
  status: number;
  text: Array<number>;
  dict: Array<Array<string>>;
}

export interface DecoderResponse {
  status: number;
  text: string;
}
