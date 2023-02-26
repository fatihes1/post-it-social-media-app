'use client'

type toggleProps = {
    onDeletePost: () => void;
    onToggle: (toggle: boolean) => void;
};

const Toggle = ({onDeletePost, onToggle}: toggleProps) => {
    return (
        <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
            <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
                <h2 className="text-xl">
                    Are you sure you want to delete this post?
                </h2>
                <h3 className="text-red-500 text-sm">
                    Pressing the delete button will delete this post and all of its comments.
                </h3>
                <button className="bg-red-500 text-sm text-white py-2 px-4 rounded-lg">
                    Delete
                </button>
            </div>
        </div>
    )
};

export default Toggle;