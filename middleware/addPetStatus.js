async function addPetStatus(req, res, next) {
  req.body.adoption_status = 'Available';
  next();
}

module.exports = { addPetStatus };