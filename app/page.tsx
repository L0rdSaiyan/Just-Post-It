
interface homeParams {

  searchParams :
  {
    id: string
  }

}

export default function Home({searchParams} : homeParams) {
  return (
      <>
        <h1>
          Página Inicial
          {searchParams.id}
        </h1>
      </>
  );
}
