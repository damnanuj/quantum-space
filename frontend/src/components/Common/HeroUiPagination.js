import { Pagination } from "@heroui/react";

export default function HeroUiPagination({ page, total, onChange }) {
  return (
    <Pagination
      size="sm"
      isCompact
      showControls
    //   color="default"
      page={page}
      total={total}
      onChange={onChange}
      //   variant="faded"
    />
  );
}
