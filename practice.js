const getEmpByMan = async () => {
  const managers = await fetchDB();
  const quesArray = [
    { // Manager NAME
      type: 'list',
      name: 'manager_id',
      message: 'Choose the manager to view employees by.',
      choices: managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name} - ${manager.title}`,
          value: manager.id.toString()
        }))
    }
  ];
  return quesArray;
};