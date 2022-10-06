import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import UserManagement from "components/admin/user/userManagement"
import WorkoutManagement from "components/admin/workout/workoutManagement"
// import WorkoutTester from "components/admin/workout/workoutTester"
import AppLayout from "components/layout/appLayout"

export default function AdminPage() {
  return (
    <AppLayout>
      <Tabs isFitted>
        <TabList>
          <Tab>Workouts</Tab>
          <Tab>Library</Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WorkoutManagement />
            {/* <WorkoutTester /> */}
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
