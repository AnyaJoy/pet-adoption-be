exports.signupSchema = {
  type: "object",
  properties: {
    first_name: {type: "string"},
    last_name: {type: "string"},
    // email: {type: "string", format: "email"},
    email: {type: "string"},
    password: {type: "string"},
    repassword: {type: "string"},
    type: {type: "string"},
    bio: {type: "string"},
  },
  required: ["first_name", "last_name", "email", "password", "repassword", "type", "bio"],
  additionalProperties: false
}

exports.loginSchema = {
  type: "object",
  properties: {
    email: {type: "string"},
    password: {type: "string"},
  },
  required: ["email", "password"],
  additionalProperties: false
}

exports.petSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    type: {type: "string"},
    bio: {type: "string"},
    adoption_status: {type: "string"},
    height: {type: "string"},
    weight: {type: "string"},
    color: {type: "string"},
    hypoallergenic: {type: "string"},
    dietery: {type: "string"},
    breed: {type: "string"},
    picture: {type: "string"},
  },
  required: ["name", "type", "bio", "adoption_status", "height", "weight", "color", "hypoallergenic", "dietery", "breed", "picture"],
  additionalProperties: false
}

exports.updateUserSchema = {
  type: "object",
  properties: {
    email: {type: "string"},
    // email: {type: "string", format: "email"},
    password: {type: "string"},
    bio: {type: "string"},
    first_name: {type: "string"},
    last_name: {type: "string"},
  },
  required: ["email", "password", "bio", "first_name", "last_name"],
  additionalProperties: false
}

exports.handlePet = {
  type: "object",
  properties: {
    userId: {type: "string"},
    petId: {type: "string"},
  },
  required: ["userId", "petId"],
  additionalProperties: false
}