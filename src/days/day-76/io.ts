export const meta = {
  id: "day-76-io",
  title: "Day 76 IO",
  prompt: "Public/Private Keys and Asymmetric Cryptography.",
};

export const questions = [
  {
    question: "How does Code Signing work conceptually?",
    answer: "The developer uses their Private Key to sign the app binary. Apple wraps the corresponding Public Key into a certificate. The iPhone then uses that Public Key to verify the app truly came from the developer."
  }
];
