import { useEffect, useState } from "react";

export const ServerStatus = () => {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => setStatus("Offline ❌"));
  }, []);

  return (
    // <div className="badge badge-outline">
    //   Server: {status}
    // </div>
    <div>
      <h2 className="text-center text-lg">Server Status</h2>
      <p className="text-center text-sm text-green-500">{status}</p>
    </div>
  );
};

export default ServerStatus;
