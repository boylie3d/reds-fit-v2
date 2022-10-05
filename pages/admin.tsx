import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import UserManagement from "components/admin/user/userManagement"
import WorkoutManagement from "components/admin/workout/workoutManagement"
import AppLayout from "components/layout/appLayout"

export default function AdminPage() {
  return (
    <AppLayout>
      <Tabs isFitted>
        <TabList>
          <Tab>Routines</Tab>
          <Tab>Library</Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WorkoutManagement />
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel>
            <UserManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  )
}
