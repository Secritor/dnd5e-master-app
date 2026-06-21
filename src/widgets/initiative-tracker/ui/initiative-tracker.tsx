import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

interface InitiativeEntry {
  id: string;
  name: string;
  initiative: number;
}

function SortableRow({ entry }: { entry: InitiativeEntry }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: entry.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
    >
      <button type="button" className="cursor-grab text-muted-foreground" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="flex-1">{entry.name}</span>
      <span className="font-mono text-dnd-gold">{entry.initiative}</span>
    </li>
  );
}

export function InitiativeTracker() {
  const [entries, setEntries] = useState<InitiativeEntry[]>([
    { id: '1', name: 'Паладин', initiative: 18 },
    { id: '2', name: 'Гоблин #1', initiative: 14 },
    { id: '3', name: 'Маг', initiative: 12 },
  ]);
  const [name, setName] = useState('');
  const [initiative, setInitiative] = useState('10');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setEntries((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const addEntry = () => {
    if (!name.trim()) return;
    setEntries((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: name.trim(), initiative: Number(initiative) || 0 },
    ]);
    setName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Трекер инициативы (dnd-kit)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="number"
            className="w-20"
            value={initiative}
            onChange={(e) => setInitiative(e.target.value)}
          />
          <Button type="button" variant="secondary" onClick={addEntry}>
            +
          </Button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={entries.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            <ul className="flex flex-col gap-2">
              {entries.map((entry) => (
                <SortableRow key={entry.id} entry={entry} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
