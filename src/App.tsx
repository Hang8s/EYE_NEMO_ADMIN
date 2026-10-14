import { useEffect, useState } from "react";
import { type Attachment, type Purge } from "./api";
import { MediaDialog, PurgeDialog } from "./Dialogs";
import { listViews, navigate } from "./navigation";
import { useAdminSession } from "./hooks/useAdminSession";
import { useAdminRoute } from "./hooks/useAdminRoute";
import { useAdminList } from "./hooks/useAdminList";
import AdminLayout from "./components/AdminLayout";
import Login from "./screens/Login";
import Overview from "./screens/Overview";
import Settings from "./screens/Settings";
import ListScreen from "./screens/ListScreen";

export default function App() {
  const auth = useAdminSession();
  if (!auth.session) return <Login login={auth.login} />;
  return (
    <AdminWorkspace key={auth.session} auth={auth} session={auth.session} />
  );
}

function AdminWorkspace({
  auth,
  session,
}: {
  auth: ReturnType<typeof useAdminSession>;
  session: string;
}) {
  const { route, menu, setMenu } = useAdminRoute();
  const [notice, setNotice] = useState("");
  const [purge, setPurge] = useState<Purge>();
  const [attachment, setAttachment] = useState<Attachment>();
  const list = useAdminList(session, route, setNotice);
  const { items, stats, busy, error, refresh } = list;
  const { view, params } = route;

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <>
      <AdminLayout
        view={view}
        params={params}
        menu={menu}
        setMenu={setMenu}
        logout={auth.logout}
        refresh={refresh}
        busy={busy}
      >
        {error && (
          <div role="alert" className="error panel">
            {error} <button onClick={refresh}>Повторити</button>
          </div>
        )}
        {notice && (
          <div role="status" className="notice">
            {notice}
          </div>
        )}
        {view === "overview" && stats && <Overview stats={stats} />}
        {view === "settings" && (
          <Settings
            report={setNotice}
            changePassword={auth.changePassword}
            revokeSessions={auth.revokeSessions}
          />
        )}
        {listViews.includes(view) && (
          <ListScreen
            view={view}
            params={params}
            list={list}
            setPurge={setPurge}
            setAttachment={setAttachment}
            report={setNotice}
          />
        )}
        {busy && items.length === 0 && (
          <div role="status" className="loading">
            Завантажуємо дані…
          </div>
        )}
      </AdminLayout>
      {purge && (
        <PurgeDialog
          selection={purge}
          close={() => setPurge(undefined)}
          done={() => {
            setNotice("Операцію стирання створено");
            navigate("operations");
            refresh();
          }}
        />
      )}
      {attachment && (
        <MediaDialog
          attachment={attachment}
          close={() => setAttachment(undefined)}
        />
      )}
    </>
  );
}
