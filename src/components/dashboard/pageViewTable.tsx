import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



type PageData = {
  url: string;
  views: string;
  uniques: string;
}

export function PageViewDemo({pages}: {pages: PageData[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Url</TableHead>
          <TableHead className="text-right">Views</TableHead>
          <TableHead className="text-right">Uniques</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map((view, ind) => (
          <TableRow key={view.url?.replaceAll('/', '_') + ind.toString()}>
            <TableCell className="font-medium">{view.url}</TableCell>
            <TableCell className="text-right">{view.views}</TableCell>
            <TableCell className="text-right">{view.uniques}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
  )
}
