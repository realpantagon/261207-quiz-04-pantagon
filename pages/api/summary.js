import { readUsersDB } from "../../backendLibs/dbLib";
import { checkToken } from "../../backendLibs/checkToken";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || user.isAdmin) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
    //compute DB summary
    const users = readUsersDB();
    let countAdmin = 0;
    let countUser = 0;
    let amountMoney = 0;
    users.forEach((x) => {
      if (x.isAdmin) {
        countAdmin++;
      } else {
        countUser++;
        amountMoney += x.money;
      }
    });

    return res.status(200).json({
      ok: true,
      userCount: countUser,
      adminCount: countAdmin,
      totalMoney: amountMoney,
    });
    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
