export const normalizeMessage = (raw, { userId, targetUserId, meFirstName, meLastName, mePhoto, targetUser }) => {
    let sender = null;

    const rawSender = raw.senderId || raw.userId;
    const isPopulated = rawSender && typeof rawSender === "object";
    const sId = isPopulated ? String(rawSender._id) : (rawSender ? String(rawSender) : "");

    if (userId && sId === String(userId)) {
        sender = { _id: userId, firstName: meFirstName, lastName: meLastName, photoUrl: mePhoto };
    } else if (targetUserId && sId === String(targetUserId)) {
        sender = targetUser || (isPopulated ? rawSender : { _id: targetUserId });
    }
    return {
        id: raw._id || raw.id || crypto.randomUUID(),
        text: raw.text ?? "",
        seen: raw.seen ?? false,
        createdAt: raw.createdAt || new Date().toISOString(),
        senderId: sId || sender?._id,
        firstName: raw.firstName || (isPopulated ? rawSender.firstName : null) || sender?.firstName || "User",
        lastName: raw.lastName || (isPopulated ? rawSender.lastName : null) || sender?.lastName || "",
        photoUrl: raw.photoUrl || (isPopulated ? rawSender.photoUrl : null) || sender?.photoUrl || "/default.png",
    };
};
