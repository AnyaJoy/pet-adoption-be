exports.signupSchema = {
  type: "object",
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    repassword: { type: "string" },
    type: { type: "string" },
    bio: { type: "string" },
    picture: { type: "string" },
  },
  required: [
    "first_name",
    "last_name",
    "email",
    "password",
    "repassword",
    "type",
    "bio",
    "picture"
  ],
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: 'Please check your email, should be real',
      password: 'Password should be at least 6 chars'
    }
  }
};

exports.loginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    _: 'Please check your data!',
  },
};

exports.petSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    type: { type: "string", enum: ["Cat", "Dog"] },
    bio: { type: "string" },
    adoption_status: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    color: { type: "string" },
    hypoallergenic: { type: "string" },
    dietery: { type: "string" },
    breed: { type: "string" },
    picture: { type: "string" },
  },
  required: [
    "name",
    "type",
    "bio",
    "adoption_status",
    "height",
    "weight",
    "color",
    "hypoallergenic",
    "dietery",
    "breed",
    "picture",
  ],
  additionalProperties: false,
  errorMessage: {
    properties: {
      height: 'Height should be a number',
      weight: 'Weight should be a number',
      type: 'Type should be either Cat or Dog'
    },
    _: 'Please check your data!',
  },
};

exports.updateUserSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    bio: { type: "string" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    picture: { type: "string" },
  },
  required: ["email", "password", "bio", "first_name", "last_name", "picture"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: 'Check your email - should be real',
      password: 'Password should be at least 6 chars'
    }
  }
};

exports.searchPetSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    adoption_status: { type: "string" },
  },
  required: [],
  additionalProperties: false,
  errorMessage: {
    _: 'Please check your data!',
  },
};
