"use client";
import { ChangeEvent, useState } from "react";
import { mdiCloseCircle, mdiPlus, mdiTelevision } from "@mdi/js";
import Icon from "@mdi/react";
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

    const newTvs: Array<TVSetting> = [...tvs];
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
        icon={<Icon title="TV" size={1} path={mdiTelevision} />}
      />
      <div className="mt-2 flex w-full flex-wrap gap-2">
        {tvs.map((tv: TVSetting, index: number) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-gray-700 py-1 pl-3 pr-2 text-gray-100"
          >
            <span
              className="cursor-pointer"
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
              <Icon title="Remove" size={1} path={mdiCloseCircle} />
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
            <Icon title="Add" size={1} path={mdiPlus} />
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
                icon={<Icon title="TV" size={1} path={mdiTelevision} />}
              />
              <InputEntity
                name="entity"
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
