const TodoSkeleton = () => {
  return (
    <section className="mt-20">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-16"></div>
          <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-16"></div>
        </div>
      </div>
    </section>
  );
};

export default TodoSkeleton;
