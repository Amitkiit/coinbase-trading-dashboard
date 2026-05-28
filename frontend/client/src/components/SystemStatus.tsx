import { memo } from "react";
interface Channel {
  name: string;
  product_ids?: string[];
}

interface Props {
  channels: Channel[];
}

const SystemStatus = ({ channels }: Props) => {
  return (
    <div
      className="p-4 glass-card"
      style={{
        borderRadius: "20px",
        border: "1px solid #30363d",
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#58a6ff" }}>
        System Status
      </h2>

      {channels.map((channel, index) => (
        <div
          key={index}
          className="mb-3 p-3"
          style={{
            background: "#0d1117",
            borderRadius: "12px",
          }}
        >
          <div>
            <strong>Channel:</strong> {channel.name}
          </div>

          <div>
            <strong>Products:</strong> {channel.product_ids?.join(", ")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(
  SystemStatus
);
