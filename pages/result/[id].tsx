import { Comment, Profile, Result, Workout } from "@/types"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import LoadingPane from "components/misc/loading"
import { useComments } from "hooks/comment"
import { useLocalProfile, useProfile } from "hooks/profile"
import { GetServerSideProps, NextPage } from "next"
import Router from "next/router"
import { get as profileGet } from "pages/api/profile/[id]"
import { get as resultGet } from "pages/api/result/[id]"
import { get as commentGet } from "pages/api/result/[id]/comment"
import { get as fistbumpGet } from "pages/api/result/[id]/fistbump/[fbId]"
import { get as workoutGet } from "pages/api/workout/[id]"
import { formatResult } from "util/common"

interface Props {
  result: Result
  profile: Profile
  workout: Workout
}

const ResultPage: NextPage<Props> = ({ result, profile, workout }: Props) => {
  const { comments, loading, error } = useComments(result.id || "")
  const { profile: local } = useLocalProfile()

  const del = async () => {
    const resp = await fetch(`/api/result/${result.id}`, { method: "DELETE" })
    const json = await resp.json()
    console.log(json)
    Router.push("/")
  }

  return (
    <AppLayout>
      <VStack gap={3} pt={4}>
        <HStack w="100%">
          <Link href={`/profile/${profile.uid}`}>
            <Avatar src={profile.photoURL} />
          </Link>
          <Text>
            <Link href={`/profile/${profile.uid}`}>{profile.displayName}</Link>
            {` logged a result on the "${workout.title}" workout`}
          </Text>
        </HStack>
        <Box w="100%">
          <ResultHeader workout={workout} result={result} />
        </Box>
        <Box w="100%">
          <Text>{result.description}</Text>
        </Box>
        {profile.uid === local?.uid && (
          <Box w="100%">
            <Grid justifyContent="flex-end">
              <HStack>
                <Button
                  size="xs"
                  variant="teamOutline"
                  onClick={() => Router.push(`/result?workoutId=${workout.id}`)}
                >
                  <EditIcon mr="0.5em" />
                  {"Edit"}
                </Button>
                <Button size="xs" onClick={del}>
                  <DeleteIcon />
                </Button>
              </HStack>
            </Grid>
          </Box>
        )}
        <Divider />
        <CommentBox comments={comments} />
      </VStack>
    </AppLayout>
  )
}

interface ResultProps {
  result: Result
  workout: Workout
}

const ResultHeader = ({ result, workout }: ResultProps) => {
  return (
    <Box h="80px" w="100%" bgColor="gray.300">
      <Center h="100%">
        <Text fontSize="2xl">{formatResult(workout, result)}</Text>
      </Center>
    </Box>
  )
}

interface CommentsProps {
  comments: Comment[] | undefined
}

const CommentBox = ({ comments }: CommentsProps) => {
  if (!comments) return <LoadingPane />
  return (
    <Box w="100%">
      <VStack gap={3}>
        {comments.map(c => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </VStack>
    </Box>
  )
}

interface CommentProps {
  comment: Comment
}
const CommentItem = ({ comment }: CommentProps) => {
  const {
    profile: lProfile,
    loading: lLoading,
    error: lError,
  } = useLocalProfile()
  const { profile, loading, error } = useProfile(comment.userId)

  if (lLoading || lLoading) return <LoadingPane />
  if (!profile || !lProfile) return <div />

  return (
    <HStack w="100%">
      <Link href={`/profile/${profile.uid}`}>
        <Avatar size="sm" src={profile.photoURL} />
      </Link>
      <Box p={3} bgColor="gray.200" w="100%" borderRadius={5}>
        <Link href={`/profile/${profile.uid}`}>
          <Text>{profile.displayName}</Text>
        </Link>
        <Text fontSize="sm">{comment.message}</Text>
        <>
          {profile.uid === lProfile.uid && (
            <Flex w="100%" pt={3}>
              <Box flex={1}>
                <Text fontSize="xs">Edit</Text>
              </Box>
              <Box flex={1}>
                <Text align="right" fontSize="xs">
                  Delete
                </Text>
              </Box>
            </Flex>
          )}
        </>
      </Box>
    </HStack>
  )
}

//TODO: swr stuff? maybe?
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.query
  const idStr = id ? id.toString() : ""
  const result = await resultGet(idStr)
  const profile = await profileGet(result.userId)
  const workout = await workoutGet(result.workoutId)
  const fistbumps = await fistbumpGet(idStr)
  const comments = await commentGet(idStr)

  return {
    props: {
      result: result,
      profile: profile,
      workout: workout,
      fistbumps: fistbumps,
      comments: comments,
    },
  }
}

export default ResultPage
