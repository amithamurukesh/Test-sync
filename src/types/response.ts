interface Response {
  message: Record<string, unknown>;
  correlationId: string;
}

export type { Response };
