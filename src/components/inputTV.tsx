"use client";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { PlusIcon, TvIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";

import type { TVSetting } from "@/types/settings";
import InputText from "@/components/inputText";
import InputEntity from "@/components/inputEntity";
import InputLabel from "@/components/inputLabel";
import { useSettings } from "@/providers/settings";

interface ItemEditing extends TVSetting {
  index: number;
}

Modal.setAppElement("#container");

export default function InputTV({ value: tvs }: { value: Array<TVSetting> }) {
  const { settings, updateSettings } = useSettings();

  const [itemEditing, setItemEditing] = useState<ItemEditing>();

  function handleChangeItem(event: ChangeEvent<HTMLInputElement>): void {
    if (!itemEditing) return;

    setItemEditing({
      ...itemEditing,
      [event.target.name]: event.target.value,
    });
  }

  function handleRemoveItem(index: number): void {
    if (!settings) return;

    const newTvs = [...tvs];
    newTvs.splice(index, 1);
    updateSettings({
      ...settings,
      tv: {
        ...settings?.tv,
        entities: newTvs,
      },
    });
  }

  function handleModalClose(): void {
    setItemEditing(undefined);
  }

  function handleModalSave(): void {
    if (!itemEditing || !settings) return;

    const newTvs = [...tvs];
    if (itemEditing.index === tvs.length) {
      newTvs.push({
        entity: itemEditing.entity,
        macAddress: itemEditing.macAddress,
      });
    } else {
      newTvs[itemEditing.index] = {
        entity: itemEditing.entity,
        macAddress: itemEditing.macAddress,
      };
    }
    updateSettings({
      ...settings,
      tv: {
        ...settings?.tv,
        entities: newTvs,
      },
    });

    handleModalClose();
  }

  return (
    <>
      <InputLabel
        label="TV Entities"
        icon={<TvIcon className="h-6 w-6 text-gray-200" />}
      />
      <div className="mt-2 flex w-full flex-wrap gap-2">
        {tvs.map((tv: TVSetting, index: number) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-gray-700 py-1 pl-3 pr-2 text-gray-100"
          >
            <span
              onClick={() => {
                setItemEditing({
                  index,
                  entity: tv.entity,
                  macAddress: tv.macAddress,
                });
              }}
            >
              {tv.entity}
            </span>
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
            type="button"
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
            <form className="flex flex-col gap-4">
              <InputLabel
                label="TV"
                icon={<TvIcon className="h-6 w-6 text-gray-200" />}
              />
              <InputEntity
                name="entitiy"
                label="Entity"
                filter={"media_player"}
                value={itemEditing.entity || ""}
                handleChange={handleChangeItem}
              />
              <InputText
                name="macAddress"
                label="MAC Address"
                value={itemEditing.macAddress || ""}
                handleChange={handleChangeItem}
              />
            </form>
          )}
          <div className="mt-4 flex flex-row justify-end gap-2">
            <button
              className="rounded-full bg-gray-900 px-4 py-2 text-gray-300 hover:text-gray-100"
              onClick={handleModalClose}
            >
              Close
            </button>
            <button
              className="rounded-full bg-gray-800 px-4 py-2 text-gray-300 hover:text-gray-100"
              onClick={handleModalSave}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
