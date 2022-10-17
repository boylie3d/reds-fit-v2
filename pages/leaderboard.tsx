import {
  Avatar,
  Center,
  HStack,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import LoadingPane from "components/misc/loading"
import { useProfile } from "hooks/profile"
import { useResults } from "hooks/result"

import { NextPage } from "next"
import { useEffect, useState } from "react"
import { AiFillTrophy } from "react-icons/ai"

interface Entry {
  profileId: string
  resultCount: number
}

const Leaderboard: NextPage = () => {
  const { results, loading, error } = useResults()
  const [entries, setEntries] = useState<Entry[] | null>(null)

  useEffect(() => {
    if (!results || results.length === 0) return

    const keys: Object = results.reduce(
      (grps: any, entry) => ({
        ...grps,
        [entry.userId]: [...(grps[entry.userId] || []), entry],
      }),
      {},
    )

    const entries: any = Object.entries(keys)
      .map(key => {
        const entry: Entry = {
          profileId: key[0],
          resultCount: key[1].length,
        }
        return entry
      })
      .sort((a, b) => b.resultCount - a.resultCount)

    setEntries(entries)
  }, [results])

  if (loading) return <LoadingPane />
  if (!entries || entries.length === 0) return <div />

  return (
    <AppLayout>
      <Center pt={3} pb={3}>
        <Text fontSize="sm">{"Complete workouts to rise the ranks!"}</Text>
      </Center>
      <TableContainer>
        <Table size="sm" variant="simple" flex={1}>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Player</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries &&
              entries.map((e, i) => (
                <EntryCard key={i} entry={e} position={i + 1} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </AppLayout>
  )
}

export default Leaderboard

interface EntryProps {
  entry: Entry
  position: number
}

const EntryCard = ({ entry, position }: EntryProps) => {
  const { profile, loading, error } = useProfile(entry.profileId)
  if (loading) return <LoadingPane />

  const getCol = (pos: number) => {
    switch (pos) {
      case 1:
        return "gold"
      case 2:
        return "silver"
      default:
        return "orange"
    }
  }

  return (
    <Tr>
      <Td>
        <HStack h="100%">
          <>
            {position < 3 && (
              <Icon color={getCol(position)} as={AiFillTrophy} />
            )}
          </>
          <Text>{position}</Text>
        </HStack>
      </Td>
      <Td>
        <HStack h="100%">
          <Avatar size="xs" src={profile?.photoURL} />
          <Text>{profile?.displayName}</Text>
        </HStack>
      </Td>
      <Td isNumeric>{entry.resultCount}</Td>
    </Tr>
  )
}
