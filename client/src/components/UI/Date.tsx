import { format as fnsFormat, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export type DateProps = {
  dateString: string;
  format?: string;
};

export const Date = (props: DateProps) => {
  const { dateString, format = "PPp" } = props;

  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>{fnsFormat(date, format, { locale: es })}</time>
  );
};
