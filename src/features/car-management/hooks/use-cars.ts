import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCars } from "../actions/get-all-car";
import { createCar } from "../actions/create-car";
import { editCar } from "../actions/edit-car";
import { deleteCar } from "../actions/delete-car";
import { getCarById } from "../actions/get-id-car";
import { type CarFormData } from "../schemas/car";

export function useGetCar(id: string | number | undefined) {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCars(filters: Record<string, any> = {}) {
  const queryClient = useQueryClient();

  const carsQuery = useQuery({
    queryKey: ["cars", filters], 
    queryFn: () => getAllCars(filters),
    placeholderData: (previousData) => previousData,
  });

  const createMutation = useMutation({
    mutationFn: (data: CarFormData) => createCar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: editCar,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["car", variables.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  return {
    carsQuery,
    useGetCar,
    createMutation,
    editMutation,
    deleteMutation,
  };
}