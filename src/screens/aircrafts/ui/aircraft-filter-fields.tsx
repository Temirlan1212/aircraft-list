import React, { useState } from "react";
import { Button, Input, Select, Tag } from "antd";
import type { AddAircraft } from "@/entities/aicraft";
import { statusApi } from "@/entities/status";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { ControlledModal } from "@/shared/ui/controlled-modal";
import { useAppMediaQueries } from "@/shared/hooks/use-app-media-quries";

interface AircraftFilterFieldsProps {
  values: Partial<AddAircraft>;
  onChange: (key: keyof AddAircraft, value: any) => void;
  fieldProps?: Partial<Record<keyof AddAircraft, any>>;
}

export const AircraftFilterFields: React.FC<AircraftFilterFieldsProps> = ({
  values,
  onChange,
  fieldProps = {},
}) => {
  const getStatusesQuery = statusApi.useGetStatusesQuery();

  const [localValues, setLocalValues] = useState(values);

  const debouncedValues = {
    registrationNumber: useDebounce(localValues.registrationNumber, 500),
    model: useDebounce(localValues.model, 500),
    year: useDebounce(localValues.year, 500),
  };

  React.useEffect(() => {
    if (debouncedValues.registrationNumber !== values.registrationNumber) {
      onChange("registrationNumber", debouncedValues.registrationNumber);
    }
    if (debouncedValues.model !== values.model) {
      onChange("model", debouncedValues.model);
    }
    if (debouncedValues.year !== values.year) {
      onChange("year", debouncedValues.year);
    }
  }, [debouncedValues, values, onChange]);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ marginBottom: "16px", flexGrow: "1" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}
        >
          Registration Number
        </label>
        <Input
          size="large"
          value={localValues.registrationNumber}
          onChange={(e) =>
            setLocalValues((prev) => ({
              ...prev,
              registrationNumber: e.target.value,
            }))
          }
          {...fieldProps.registrationNumber}
        />
      </div>

      <div style={{ marginBottom: "16px", flexGrow: "1" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}
        >
          Model
        </label>
        <Input
          size="large"
          value={localValues.model}
          onChange={(e) =>
            setLocalValues((prev) => ({
              ...prev,
              model: e.target.value,
            }))
          }
          {...fieldProps.model}
        />
      </div>

      <div style={{ marginBottom: "16px", flexGrow: "1" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}
        >
          Year
        </label>
        <Input
          type="number"
          size="large"
          value={localValues.year}
          onChange={(e) =>
            setLocalValues((prev) => ({
              ...prev,
              year: +e.target.value,
            }))
          }
          {...fieldProps.year}
        />
      </div>

      <div style={{ marginBottom: "16px", flexGrow: "1" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}
        >
          Status
        </label>
        <Select
          size="large"
          value={localValues.status}
          onChange={(value) => onChange("status", value)}
          style={{ width: "100%", minWidth: "200px" }}
          {...fieldProps.status}
        >
          <Select.Option key="default" value="">
            <Tag> Show all</Tag>
          </Select.Option>
          {getStatusesQuery.data?.map((item) => (
            <Select.Option key={item.id} value={item.value}>
              <Tag color={item.color}> {item.label}</Tag>
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export const useAircraftFilterFields = () => {
  const { isDesktop, isMobile } = useAppMediaQueries();
  const [values, setValues] = useState<Partial<AddAircraft>>({
    registrationNumber: "",
    model: "",
    year: undefined,
    status: undefined,
  });

  const [submitValues, setSubmitValues] = useState<Partial<AddAircraft>>({
    registrationNumber: "",
    model: "",
    year: undefined,
    status: undefined,
  });

  const handleFieldChange = <K extends keyof AddAircraft>(
    key: K,
    value: AddAircraft[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const submit = () => setSubmitValues(values);

  const convertValuesToQueryParams = (
    values: Partial<AddAircraft>,
    filterType: string = "_like",
  ) => {
    const params = new URLSearchParams();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(`${key}${filterType}`, String(value));
      }
    });

    return params.toString();
  };

  const renderFilterFields = () => {
    if (isMobile) {
      return (
        <ControlledModal
          title="Filter Aircrafts"
          defaultTriggerProps={{
            children: "Filter Aircrafts",
          }}
          render={({ close }) => (
            <>
              <AircraftFilterFields
                values={values}
                onChange={handleFieldChange}
              />
              <Button
                variant="filled"
                style={{ width: "100%" }}
                onClick={() => {
                  submit();
                  close();
                }}
              >
                Search
              </Button>
            </>
          )}
        />
      );
    }

    if (isDesktop) {
      return (
        <AircraftFilterFields values={values} onChange={handleFieldChange} />
      );
    }
  };

  return {
    handleFieldChange,
    values,
    submitValues,
    submit,
    convertValuesToQueryParams,
    renderFilterFields,
  };
};
