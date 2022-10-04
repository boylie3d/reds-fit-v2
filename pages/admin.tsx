import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import UserManagement from "components/admin/userManagement"
import AppLayout from "components/layout/appLayout"

export default function AdminPage() {
  return (
    <AppLayout>
      <Tabs>
        <TabList>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  )
}
