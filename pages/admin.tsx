import { AccessType } from "@/types"
import {
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"
import AnnouncementManagement from "components/admin/announcement/announcementManagement"
import LibraryManagement from "components/admin/library/libraryManagement"
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
      <Tabs colorScheme="red" size="sm" isFitted>
        <TabList>
          <Tab>
            <Text fontSize="xs">Workouts</Text>
          </Tab>
          <Tab>
            <Text fontSize="xs">Announcements</Text>
          </Tab>
          <Tab>
            <Text fontSize="xs">Library</Text>
          </Tab>
          <Tab>
            <Text fontSize="xs">Users</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WorkoutManagement />
          </TabPanel>
          <TabPanel>
            <AnnouncementManagement />
          </TabPanel>
          <TabPanel>
            <LibraryManagement />
          </TabPanel>
          <TabPanel>
            <UserManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  )
}
