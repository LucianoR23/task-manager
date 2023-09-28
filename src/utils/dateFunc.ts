import { formatDistanceToNow } from "date-fns";


export const getDistanceToNow = ( date: number) => {

    const fromNow = formatDistanceToNow( date )

    return `${fromNow} ago`

}