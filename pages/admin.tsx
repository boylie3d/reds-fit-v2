import { AccessType } from "@/types"
import {
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import UserManagement from "components/admin/user/userManagement"
import WorkoutManagement from "components/admin/workout/workoutManagement"
import AppLayout from "components/layout/appLayout"
import LoadingPane from "components/misc/loading"
import { useLocalProfile } from "hooks/profile"

export default function AdminPage() {
  const { profile, loading, error } = useLocalProfile()

  if (loading) return <LoadingPane />

  if (profile?.accessType !== AccessType.Admin) {
    return (
      <AppLayout>
        <Center h="100vh">Nope. Git outta here.</Center>
      </AppLayout>
    )
  }

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
