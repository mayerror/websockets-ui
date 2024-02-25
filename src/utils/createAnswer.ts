function createAnswer(type: string, data: Record<string, unknown>): string {
  const answer = {
    type,
    data: JSON.stringify(data),
    id: 0
  };
  return JSON.stringify(answer);
}

export default createAnswer;
