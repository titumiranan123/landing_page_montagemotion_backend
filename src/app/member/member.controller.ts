import { Request, Response } from "express";
import { MemberService } from "./member.service";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { MemberProfile } from "./member.interface";

export const MemberController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const { name, role, photourl }: Partial<MemberProfile> = req.body;

    if (!name || !role || !photourl) {
      return responseHandler(
        res,
        400,
        false,
        "Name, role, and photo URL are required",
      );
    }

    const member = await MemberService.createMember(req.body);
    return responseHandler(res, 201, true, "Member created", member);
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const role = req.query.role as "team_member" | "influencer" | undefined;
    const members = await MemberService.getAllMembers(role);
    return responseHandler(res, 200, true, "Members fetched", members);
  }),

  getMemberById: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return responseHandler(res, 400, false, "Member ID is required");

    const member = await MemberService.getMembersById(id);
    if (!member || member.length === 0) {
      return responseHandler(res, 404, false, "Member not found");
    }
    return responseHandler(res, 200, true, "Member fetched", member[0]);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return responseHandler(res, 400, false, "Member ID is required");

    const updated = await MemberService.updateMember(id, req.body);
    return responseHandler(res, 200, true, "Member updated", updated);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return responseHandler(res, 400, false, "Member ID is required");

    const deleted = await MemberService.deleteMember(id);
    if (!deleted) return responseHandler(res, 404, false, "Member not found");

    return responseHandler(res, 200, true, "Member deleted", deleted);
  }),

  updatePosition: asyncHandler(async (req: Request, res: Response) => {
    const members: { id: string; position: number }[] = req.body.members;
    if (!Array.isArray(members) || members.length === 0) {
      return responseHandler(res, 400, false, "Members array is required");
    }

    await MemberService.updateMemberPosition(members);
    return responseHandler(res, 200, true, "Positions updated");
  }),
};
