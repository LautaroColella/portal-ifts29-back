const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("Comment");
};

const findAllByTicketId = async (ticketId) => {
  const commentRepository = getRepository();

  return await commentRepository.find({
    where: {
      ticket: {
        id: ticketId,
      },
    },

    order: {
      createdAt: "ASC",
    },
  });
};

const createComment = async (commentData) => {
  const commentRepository = getRepository();

  const comment = commentRepository.create(commentData);

  return await commentRepository.save(comment);
};

module.exports = {
  findAllByTicketId,
  createComment,
};
