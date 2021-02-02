"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.before = void 0;

var _commonvars = require("./commonvars");

var before = function before(req, res, next) {
  return regeneratorRuntime.async(function before$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Object.assign(res.locals, {
            user: req.session.user || _commonvars.user,
            page: _commonvars.page
          });
          Object.assign(res.locals.page, {
            messages: req.flash('messages')
          });
          next();

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.before = before;