import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { FiDownload, FiFilter } from "react-icons/fi";
import { downloadMenuItems, filterMenuItems } from "./constant";
import { RiResetLeftFill } from "react-icons/ri";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { ChartFiltersPropsInterface } from "./type";

const ChartFilters: React.FC<ChartFiltersPropsInterface> = ({
  handleDownloadCSV,
  handleDownloadPNG,
  handleDownloadSVG,
  handleResetZoom,
  handleSelectYaxis,
  handleCustomRange,
  handleLastDays,
}) => {
  const menuItems = (
    <Menu
      items={downloadMenuItems({
        handleDownloadCSV,
        handleDownloadPNG,
        handleDownloadSVG,
      })}
    />
  );

  const filterItems =
    handleSelectYaxis && handleCustomRange && handleLastDays ? (
      <Menu
        items={
          filterMenuItems({
            handleSelectYaxis,
            handleCustomRange,
            handleLastDays,
          }) as ItemType<MenuItemType>[]
        }
      />
    ) : null;

  return (
    <div className="flex items-center gap-[6px]">
      <Dropdown overlay={menuItems} trigger={["click"]}>
        <Button variant="outlined" color="primary" rootClassName="px-2 py-1">
          <FiDownload className="text-[16px]" />
        </Button>
      </Dropdown>
      <Button
        onClick={handleResetZoom}
        variant="outlined"
        color="primary"
        rootClassName="px-2 py-1"
      >
        <RiResetLeftFill className="text-[16px]" />
      </Button>
      {filterItems && (
        <Dropdown overlay={filterItems} trigger={["click"]}>
          <Button variant="outlined" color="primary" rootClassName="px-2 py-1">
            <FiFilter className="text-[16px]" />
          </Button>
        </Dropdown>
      )}
    </div>
  );
};

export default ChartFilters;
