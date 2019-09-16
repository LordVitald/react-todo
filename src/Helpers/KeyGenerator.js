function* generateKey4Task(initParam){

    let current_key = initParam ? initParam : 0;
    do{
        yield ++current_key;
    }while (true)
}

export default generateKey4Task;