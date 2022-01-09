const AuditLog = require("./model/schema");

const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello";
    },
    getLogs: async () => {
      return await AuditLog.find({});
    },
  },

  Mutation: {
    createLog: async (parent, args, ctxt, info) => {
      const { createdAt, severity, component, context, message, tags } =
        args.log;
      const newLog = new AuditLog({
        createdAt,
        severity,
        component,
        context,
        message,
        tags,
      });
      await newLog.save();
      return newLog;
    },
  },
};

module.exports = resolvers;