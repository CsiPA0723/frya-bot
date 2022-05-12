interface Command {
  name: string;
  desc: string;
  usage: string;

  execute(...args: any[]): Promise<any>;
}

export default Command;