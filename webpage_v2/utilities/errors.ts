class MissingRequirement extends Error {
  constructor(type: string) {
    super(`Missing requirement: ${type}`);
  }
}

class Unauthorized extends Error {
  constructor() {
    super('Cannot initialize session, missing token.');
  }
}

export { MissingRequirement, Unauthorized };
