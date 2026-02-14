import type { T } from "@/lib/type/common";
import { useCallback, useState } from "react";

export function usePropertiesFilter(initalFilter: T) {
  const [propertiesFilter, setPropertiesFilter] = useState<T>(initalFilter);

  // -------------------------- WORKING WITH  TYPING INPUT ------------------
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertiesFilter((prev) => ({
      ...prev,
      propertySearch: e?.target?.value,
    }));
  }, []);

  // -------------------------- WORKING WITH  SEARCH LOCATION ------------------
  const handleLocation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPropertiesFilter((prev) => ({
        ...prev,
        propertyLocation: e?.target?.value,
      }));
    },
    [],
  );

  // -------------------------- WORKING WITH CLEARING TYPING INPUT ---------------------

  const handleClearInput = useCallback(() => {
    setPropertiesFilter((prev) => ({
      ...prev,
      propertySearch: "",
    }));
  }, []);

  // -------------------------- WORKING WITH SWITCH INPUTS ------------------

  const handleSwitch = useCallback((checked: boolean, el: string) => {
    if (el === "isVerified")
      setPropertiesFilter((prev) => ({
        ...prev,
        propertyVerified: checked,
      }));
    if (el === "isSuperAgent")
      setPropertiesFilter((prev) => ({
        ...prev,
        propertyAgentLevel: checked,
      }));
  }, []);

  // -------------------------- WORKING WITH ADDING KEYS -----------------------

  const handleAddKeys = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
      setPropertiesFilter((prev) => ({ ...prev, [key]: e?.target?.value }));
    },
    [],
  );

  // --------------------------- HANDLE PRICE ---------------------------
  const handlePrice = useCallback((key: string, value: T) => {
    setPropertiesFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleAmenitites = useCallback((key: string, _: T) => {
    setPropertiesFilter((prev) => {
      if (Object.keys(prev.propertyAmenities).includes(key)) {
        const { [key]: _, ...rest } = prev.propertyAmenities;
        return { ...prev, propertyAmenities: { ...rest } };
      }

      return {
        ...prev,
        propertyAmenities: { ...prev.propertyAmenities, [key]: true },
      };
    });
  }, []);

  return {
    propertiesFilter,
    handleInput,
    handleClearInput,
    handleSwitch,
    handleAddKeys,
    handlePrice,
    handleAmenitites,
    handleLocation,
  };
}
