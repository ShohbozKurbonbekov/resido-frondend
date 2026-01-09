import type { SetStateType } from "@/lib/type/common";
import type { Property } from "@/lib/type/property";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MyPropertiesEditModelType {
  setOpenModal: SetStateType<boolean>;
  fetchedProperty: Property;
  openModal: boolean;
}

export default function MyPropertiesEditModel({
  openModal,
  fetchedProperty,
  setOpenModal,
}: MyPropertiesEditModelType) {
  console.log(fetchedProperty);
  //  const handleSavebtn = useCallback(
  //     async (values: z.infer<typeof BlogFormSchema>) => {
  //       if (!selectedBlog) return;

  //       const blogInput = {
  //         ...values,
  //         ...(values.blogImage instanceof File
  //           ? { blogImage: values.blogImage }
  //           : {}),
  //         blogTags: tags,
  //       } as Blog;

  //       const snapshot = {
  //         blogs: [...agentMyBlogs.blogs],
  //         totalBlogsNumber: agentMyBlogs.totalBlogsNumber,
  //       };

  //       try {
  //         const member = new AgentService();
  //         const result = await member.agentUpdateMyBlog(
  //           blogInput,
  //           selectedBlog._id
  //         );
  //         const updatedBlogs = [
  //           ...agentMyBlogs.blogs.map((blog) =>
  //             blog._id === result._id ? result : blog
  //           ),
  //         ];
  //         setAgentMyBlogs({
  //           blogs: updatedBlogs,
  //           totalBlogsNumber: snapshot.totalBlogsNumber,
  //         });

  //         setModelOpen(false);
  //         setSelectedBlog(null);
  //         await sweetTopSmallSuccessAlert("Successfully updated!");
  //       } catch (error) {
  //         console.log("Error in handleSaveBtn: ", error);
  //         await sweetErrorHandling(error!);
  //       }
  //     },
  //     [
  //       agentMyBlogs,
  //       selectedBlog,
  //       setAgentMyBlogs,
  //       tags,
  //       setModelOpen,
  //       setSelectedBlog,
  //     ]
  //   );
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger
        className="hidden opacity-0"
        aria-labelledby="edit property modal"
      >
        Edit property
      </DialogTrigger>
      <DialogContent className="h-fit w-11/12 max-w-6xl">
        <DialogHeader>
          <DialogTitle className="font-jostFont text-slate-800 text-lg text-center">
            Edit your property here
          </DialogTitle>
        </DialogHeader>
        <div className="">Content</div>
      </DialogContent>
    </Dialog>
  );
}
