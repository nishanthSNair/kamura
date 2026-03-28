"use client";

import { useState } from "react";
import StackFAB from "./StackFAB";
import StackDrawer from "./StackDrawer";

export default function StackShell() {
 const [drawerOpen, setDrawerOpen] = useState(false);

 return (
 <>
 <StackFAB onClick={() => setDrawerOpen(true)} />
 <StackDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
 </>
 );
}
