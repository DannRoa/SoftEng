import { useEffect, useState } from "react";

const OK = "capo_live_orders";
const RK = "capo_live_requests";
const SK = "capo_staff";

const read = (k, fb = []) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? fb;
  } catch {
    return fb;
  }
};
const write = (k, v) => {
  localStorage.setItem(k, JSON.stringify(v));
  window.dispatchEvent(new Event("capo-live"));
};

export const addOrder = (o) => write(OK, [...read(OK), o]);
export const setOrderStatus = (id, status) =>
  write(
    OK,
    read(OK).map((o) =>
      o.id === id
        ? {
            ...o,
            status,
            ...(status === "served" ? { servedAt: Date.now() } : {}),
          }
        : o,
    ),
  );

export const addRequest = (r) =>
  write(RK, [
    ...read(RK),
    { id: crypto.randomUUID(), createdAt: Date.now(), ...r },
  ]);
export const ackRequest = (id) =>
  write(
    RK,
    read(RK).filter((r) => r.id !== id),
  );

export function useLiveStore() {
  const get = () => ({ orders: read(OK), requests: read(RK) });
  const [state, setState] = useState(get);
  useEffect(() => {
    const refresh = () => setState(get());
    window.addEventListener("storage", refresh);
    window.addEventListener("capo-live", refresh);
    const t = setInterval(refresh, 3000);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("capo-live", refresh);
      clearInterval(t);
    };
  }, []);
  return state;
}

/* ---------- Staff accounts (demo only, change these) ---------- */
const STAFF = [
  { id: "marco", pin: "1234", name: "Marco D.", role: "Floor Staff" },
  { id: "admin", pin: "0000", name: "Admin", role: "Manager" },
];

export const staffLogin = (id, pin) => {
  const s = STAFF.find(
    (x) => x.id === id.trim().toLowerCase() && x.pin === pin,
  );
  if (!s) throw new Error("Wrong staff ID or PIN.");
  const session = {
    id: s.id,
    name: s.name,
    role: s.role,
    startedAt: Date.now(),
  };
  localStorage.setItem(SK, JSON.stringify(session));
  return session;
};
export const getStaff = () => read(SK, null);
export const staffLogout = () => localStorage.removeItem(SK);
