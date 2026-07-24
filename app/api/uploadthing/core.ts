import { createUploadthing, type FileRouter, UTApi } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const { ProfileImage } = await import("@/lib/models");
const utapi = new UTApi();

const f = createUploadthing();

export const uploadRouter = {
    profileImage: f({
        image: { maxFileSize: "8MB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const session = await getServerSession(authOptions);
            if (!session) throw new Error("Not logged in");
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // Save image URL to DB
            try {
                const existing = await ProfileImage.findOne({ where: { userId: metadata.userId } });

                if (existing?.toJSON().fileKey) {
                    utapi.deleteFiles(existing.toJSON().fileKey);
                }

                const newData = {
                    userId: metadata.userId,
                    url: file.ufsUrl,
                    fileKey: file.key,
                    filename: file.name,
                    size: file.size,
                    type: file.type,
                    provider: "uploadthing",
                };


                if (existing) {
                    await existing.update(newData);
                } else {
                    await ProfileImage.create(newData);
                }
            } catch (error) {
                console.log(error)
            }

            return { url: file.ufsUrl };
        })
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
