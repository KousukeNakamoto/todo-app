import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Todo } from "../../../../../../prisma/client";
import dayjs from "dayjs";
import { ja } from "date-fns/locale";

type CalendarType = {
  setTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
  todo: Todo;
  handleTodoEdit: (todo: Todo) => Promise<void>;
};

export const CalendarInput = ({
  setTodo,
  todo,
  handleTodoEdit,
}: CalendarType) => {
  const handleCalendar = (e?: Date) => {
    if (!e) return;
    setTodo({ ...todo, dueDate: e });
    handleTodoEdit({ ...todo, dueDate: e });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "font-normal border-none w-20",
            !todo.dueDate && "text-muted-foreground"
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          <span>
            {todo.dueDate
              ? `残り${dayjs(todo.dueDate).diff(dayjs(), "day")}日`
              : "期限なし"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={ja}
          weekStartsOn={1}
          mode="single"
          selected={todo.dueDate ? todo.dueDate : undefined}
          onSelect={handleCalendar}
          fromDate={new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
