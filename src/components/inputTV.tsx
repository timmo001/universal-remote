"use client";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { PlusIcon, TvIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";

import type { TVSetting } from "@/types/settings";
import InputText from "@/components/inputText";
import InputEntity from "@/components/inputEntity";
import InputLabel from "@/components/inputLabel";

interface ItemEditing extends TVSetting {
  index: number;
}

Modal.setAppElement("#container");

export default function InputTV({
  value: tvs,
  handleChange,
}: {
  value: Array<TVSetting>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const [itemEditing, setItemEditing] = useState<ItemEditing>();

  function handleChangeItem(event: ChangeEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement;
  }

  function handleRemoveItem(index: number): void {
    throw new Error("Function not implemented.");
  }

  function handleModalClose(): void {
    setItemEditing(undefined);
  }

  return (
    <>
      <InputLabel
        label="TV Entities"
        icon={<TvIcon className="h-6 w-6 text-gray-200" />}
      />
      <div className="mt-2 flex w-full flex-wrap">
        {tvs.map((tv: TVSetting, index: number) => (
          <div
            key={index}
            className="mb-2 mr-2 flex items-center rounded-full bg-gray-700 py-1 pl-3 pr-2 text-gray-100"
          >
            <span>{tv.entity}</span>
            <button
              className="ml-2 text-gray-300 hover:text-gray-100"
              onClick={() => handleRemoveItem(index)}
            >
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm4.293 11.707a1 1 0 11-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 11-1.414-1.414L8.586 10l-2.879-2.879a1 1 0 111.414-1.414L10 8.586l2.879-2.879a1 1 0 111.414 1.414L11.414 10l2.879 2.879z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
        <div className="flex items-center rounded-full bg-gray-700 p-2 text-gray-100">
          <button
            className="text-gray-300 hover:text-gray-100"
            onClick={() => {
              setItemEditing({
                entity: "",
                macAddress: "",
                index: tvs.length,
              });
            }}
          >
            <PlusIcon className="h-4 w-4 fill-current" />
          </button>
        </div>
      </div>

      <Modal
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
        contentLabel="Edit TV Entity"
        isOpen={itemEditing ? true : false}
        overlayClassName="fixed inset-0"
        onRequestClose={handleModalClose}
      >
        <div className="rounded-lg bg-black p-6 opacity-100">
          {itemEditing && (
            <div className="flex flex-col gap-4">
              <InputLabel
                label="TV"
                icon={<TvIcon className="h-6 w-6 text-gray-200" />}
              />
              <InputEntity
                name="tv.entities"
                label="Entity"
                filter={"media_player"}
                value={itemEditing.entity || ""}
                handleChange={handleChangeItem}
              />
              <InputText
                name={`tv.${itemEditing.index}.macAddress`}
                label="MAC Address"
                value={itemEditing.macAddress || ""}
                handleChange={handleChangeItem}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
