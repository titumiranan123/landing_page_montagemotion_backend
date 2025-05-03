import { Request, Response } from "express";
import { MemberService } from "./member.service";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";

export const MemberController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const member = await MemberService.createMember(req.body);
    return responseHandler(res, 201, true, "Member created", member);
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const role = req.query.role as "Team Member" | "Influencer";
    const members = await MemberService.getAllMembers(role);
    return responseHandler(res, 200, true, "Members fetched", members);
  }),

  getMemberById: asyncHandler(async (req: Request, res: Response) => {
    const member = await MemberService.getMembersById(req.params.id);
    if (!member) return responseHandler(res, 404, false, "Member not found");
    return responseHandler(res, 200, true, "Member fetched", member);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const updated = await MemberService.updateMember(req.params.id, req.body);
    return responseHandler(res, 200, true, "Member updated", updated);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const deleted = await MemberService.deleteMember(req.params.id);
    if (!deleted) return responseHandler(res, 404, false, "Member not found");
    return responseHandler(res, 200, true, "Member deleted", deleted);
  }),

  updatePosition: asyncHandler(async (req: Request, res: Response) => {
    await MemberService.updateMemberPosition(req.body.members);
    return responseHandler(res, 200, true, "Positions updated");
  }),
};
